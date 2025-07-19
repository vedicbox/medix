// hooks/useFormValidation.js
import { debounce } from 'lodash';
import { useCallback, useState } from 'react';
import { validateAll, validateField } from './validation';

export const useFormValidation = (validationRules) => {
    const [errors, setErrors] = useState({});

    // Memoized field validator
    const validateFieldHandler = useCallback((name, value) => {
        if (!validationRules[name]) return { status: false };

        return validateField(validationRules[name], value);
    }, [validationRules]);

    // Centralized error updater
    const handleErrorUpdate = useCallback((name, value) => {
        setErrors(prev => {
            const validation = validateFieldHandler(name, value);

            if (validation.status) {
                return { ...prev, [name]: validation.msg };
            }

            const { [name]: _, ...rest } = prev;
            return rest;
        });
    }, [validateFieldHandler]);

    // Debounced change handler
    const handleChange = useCallback(
        debounce(({ target: { name, value } }) => {
            handleErrorUpdate(name, value);
        }, 500),
        [handleErrorUpdate]
    );

    // Immediate blur handler
    const handleBlur = useCallback(
        ({ target: { name, value } }) => {
            handleErrorUpdate(name, value);
        },
        [handleErrorUpdate]
    );

    // Full form validator
    const validateAllHandler = useCallback(async (formData) => {
        try {
            const validationResult = await validateAll(validationRules, formData);

            if (validationResult) {
                setErrors({});
                return true;
            }

            setErrors(validationResult.errors);
            return false;

        } catch (error) {

            setErrors(error);
            return false;
        }
    }, [validationRules]);

    return {
        errors,
        handleChange,
        handleBlur,
        validateAll: validateAllHandler, // Renamed for consistency
        handleErrorUpdate,
        setErrors,
    };
};