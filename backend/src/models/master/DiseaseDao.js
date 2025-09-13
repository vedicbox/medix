import mongoose from "mongoose";

// Validation constants
const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 100;
const UUID_V4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// SubDisease schema (mirrors SubModule pattern but simplified for diseases)
const SubDiseaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "SubDisease name is required"],
        trim: true,
        minLength: [NAME_MIN_LENGTH, `SubDisease name must be at least ${NAME_MIN_LENGTH} characters`],
        maxLength: [NAME_MAX_LENGTH, `SubDisease name cannot exceed ${NAME_MAX_LENGTH} characters`],
    },
    uuid: {
        type: String,
        required: [true, "SubDisease UUID is required"],
        trim: true,
        validate: {
            validator: (value) => UUID_V4_REGEX.test(value),
            message: "UUID must be a valid UUID v4 format"
        }
    },
    status: {
        type: Boolean,
        default: true 
    }
}, { _id: false });

// Main Disease schema
const DiseaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Disease name is required"],
        unique: true,
        trim: true,
        minLength: [NAME_MIN_LENGTH, `Disease name must be at least ${NAME_MIN_LENGTH} characters`],
        maxLength: [NAME_MAX_LENGTH, `Disease name cannot exceed ${NAME_MAX_LENGTH} characters`],
    },
    status: {
        type: Boolean,
        default: true,
    },
    subDiseases: {
        type: [SubDiseaseSchema],
        default: []
    }
}, {
    timestamps: true
});

// === Pre-save: check unique disease name and unique subDisease names/uuids within this disease ===
DiseaseSchema.pre('save', function (next) {
    const doc = this;

    // trim disease name
    if (doc.name && typeof doc.name === 'string') {
        doc.name = doc.name.trim();
    }

    // 1) check duplicate disease name (friendly check)
    mongoose.models.Diseases?.findOne({ name: doc.name })
        .then(existing => {
            if (existing && existing._id.toString() !== doc._id?.toString()) {
                const err = new Error("Disease name must be unique");
                err.name = "DuplicateError";
                throw err;
            }

            // 2) check duplicates inside subDiseases (by name)
            if (doc.subDiseases && doc.subDiseases.length > 0) {
                const names = doc.subDiseases.map(sd => sd.name);
                const uuids = doc.subDiseases.map(sd => sd.uuid);
                const uniqueNames = new Set(names);
                const uniqueUuids = new Set(uuids);

                if (names.length !== uniqueNames.size) {
                    const err = new Error("Duplicate subDisease names found within the same disease");
                    err.name = "DuplicateError";
                    throw err;
                }
                if (uuids.length !== uniqueUuids.size) {
                    const err = new Error("Duplicate subDisease uuids found within the same disease");
                    err.name = "DuplicateError";
                    throw err;
                }
            }

            next();
        })
        .catch(err => next(err));
});

// === Pre-findOneAndUpdate: validate updates (trim name, check duplicates in subDiseases, validate status boolean) ===
DiseaseSchema.pre('findOneAndUpdate', async function (next) {
    try {
        const update = this.getUpdate() || {};

        // normalize $set shorthand
        const $set = update.$set || update;

        // Trim disease name if present
        if ($set.name && typeof $set.name === 'string') {
            $set.name = $set.name.trim();
            // put trimmed back into update (works for both $set and direct)
            if (update.$set) update.$set.name = $set.name; else update.name = $set.name;
        }

        // 1) If name is being updated -> check uniqueness (friendly check)
        const nameToCheck = $set.name;
        if (nameToCheck) {
            const existing = await mongoose.models.Diseases?.findOne({ name: nameToCheck });
            const queryId = this.getQuery()._id;
            if (existing) {
                // if updating some other document to a name that already exists -> error
                if (!queryId || existing._id.toString() !== queryId.toString()) {
                    const err = new Error("Disease name must be unique");
                    err.name = "DuplicateError";
                    return next(err);
                }
            }
        }

        // 2) If subDiseases array is being set/updated, validate duplicate names/uuids inside it
        const subDiseasesToCheck = (update.$set && update.$set.subDiseases) || update.subDiseases;
        if (Array.isArray(subDiseasesToCheck)) {
            const names = subDiseasesToCheck.map(sd => sd.name);
            const uuids = subDiseasesToCheck.map(sd => sd.uuid);
            const uniqueNames = new Set(names);
            const uniqueUuids = new Set(uuids);

            if (names.length !== uniqueNames.size) {
                const err = new Error("Duplicate subDisease names found within the same disease");
                err.name = "DuplicateError";
                return next(err);
            }
            if (uuids.length !== uniqueUuids.size) {
                const err = new Error("Duplicate subDisease uuids found within the same disease");
                err.name = "DuplicateError";
                return next(err);
            }

            // also validate uuid format for each item if provided
            for (const sd of subDiseasesToCheck) {
                if (sd.uuid && typeof sd.uuid === 'string' && !UUID_V4_REGEX.test(sd.uuid)) {
                    const err = new Error("Each subDisease uuid must be a valid UUID v4");
                    err.name = "ValidationError";
                    return next(err);
                }
                if (!sd.name || typeof sd.name !== 'string' || sd.name.trim().length < NAME_MIN_LENGTH) {
                    const err = new Error(`Each subDisease must have a valid name (min ${NAME_MIN_LENGTH} chars)`);
                    err.name = "ValidationError";
                    return next(err);
                }
                // status validation if present
                if (sd.status !== undefined && typeof sd.status !== 'boolean') {
                    const err = new Error("Each subDisease status must be a boolean (true/false)");
                    err.name = "ValidationError";
                    return next(err);
                }
            }
        }

        // 3) If top-level status is present ensure it's boolean
        if ($set.status !== undefined && typeof $set.status !== 'boolean') {
            const err = new Error("Status must be a boolean value (true/false)");
            err.name = "ValidationError";
            return next(err);
        }

        // place back modified update (important if we changed trimmed name)
        if (update.$set) this.setUpdate({ ...update, $set }); else this.setUpdate({ ...update, name: $set.name });

        next();
    } catch (err) {
        next(err);
    }
});

const DiseaseDao = mongoose.model("Diseases", DiseaseSchema);

export default DiseaseDao;