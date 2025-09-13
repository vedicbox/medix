// === Common Rule Generators ===

export const required = (label) => ({
    required: true,
    props: {
        msgVariable: { label },
    },
});

export const alphaRequired = (label) => ({
    required: true,
    alpha: true,
    props: {
        msgVariable: { label },
    },
});

export const emailRequired = (label) => ({
    required: true,
    email: true,
    props: {
        msgVariable: { label },
    },
});

export const numericRequired = (label, count = null) => ({
    required: true,
    numeric: true,
    ...(count && { length: count }),
    props: {
        msgVariable: { label, ...(count && { count }) },
    },
});

export const optionalNumeric = (label, count = null) => ({
    numeric: true,
    ...(count && { length: count }),
    props: {
        msgVariable: { label, ...(count && { count }) },
        optional: true,
    },
});

export const requiredWithLength = (label, count) => ({
    required: true,
    minlength: count,
    props: {
        msgVariable: { label, count },
    },
});
