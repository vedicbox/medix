import mongoose from "mongoose";

// Validation constants
const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 50;
const TAG_MAX_LENGTH = 20;

// SubModule schema
const SubModuleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "SubModule name is required"],
        trim: true,
        minLength: [NAME_MIN_LENGTH, `SubModule name must be at least ${NAME_MIN_LENGTH} characters`],
        maxLength: [NAME_MAX_LENGTH, `SubModule name cannot exceed ${NAME_MAX_LENGTH} characters`],
    },
    tag: {
        type: String,
        required: [true, "SubModule tag is required"],
        trim: true,
        maxLength: [TAG_MAX_LENGTH, `SubModule tag cannot exceed ${TAG_MAX_LENGTH} characters`],
    },
    category: {
        type: [String],
        required: true,
        default: [],
    },
    uuid: {
        type: String,
        required: [true, "SubModule UUID is required"],
        trim: true,
        validate: {
            validator: (value) => /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value),
            message: "UUID must be a valid UUID v4 format"
        }
    }
}, { _id: false });

// Main Module schema
const ModuleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Module name is required"],
            unique: true,
            trim: true,
            minLength: [NAME_MIN_LENGTH, `Module name must be at least ${NAME_MIN_LENGTH} characters`],
            maxLength: [NAME_MAX_LENGTH, `Module name cannot exceed ${NAME_MAX_LENGTH} characters`],
        },
        tag: {
            type: String,
            required: [true, "Module tag is required"],
            unique: true,
            trim: true,
            maxLength: [TAG_MAX_LENGTH, `Module tag cannot exceed ${TAG_MAX_LENGTH} characters`],
        },
        category: {
            type: [String],
            required: true,
            default: [],
        },
        subModules: {
            type: [SubModuleSchema],
            default: []
        }
    },
    {
        timestamps: true
    }
);


// Pre-save middleware to check for duplicate subModule tags
ModuleSchema.pre('save', function (next) {
    if (this.subModules && this.subModules.length > 0) {
        const tags = this.subModules.map(sub => sub.tag);
        const uniqueTags = new Set(tags);

        if (tags.length !== uniqueTags.size) {
            const error = new Error('Duplicate subModule tags found within the same module');
            return next(error);
        }
    }
    next();
});

// Pre-update middleware for findByIdAndUpdate
ModuleSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();

    if (update.$set && update.$set.subModules) {
        const tags = update.$set.subModules.map(sub => sub.tag);
        const uniqueTags = new Set(tags);

        if (tags.length !== uniqueTags.size) {
            const error = new Error('Duplicate subModule tags found within the same module');
            return next(error);
        }
    }

    if (update.subModules) {
        const tags = update.subModules.map(sub => sub.tag);
        const uniqueTags = new Set(tags);

        if (tags.length !== uniqueTags.size) {
            const error = new Error('Duplicate subModule tags found within the same module');
            return next(error);
        }
    }

    next();
});


const ModuleDao = mongoose.model("modules", ModuleSchema);

export default ModuleDao;