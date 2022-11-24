import { FormError } from '@definitions/api';
import { RestErrorType } from '@libs/constant';
import { SafeNumber } from '@definitions/global';

class FormValidator {
    protected formError: FormError = {
        errors: [],
        success: false
    };

    setErrors(errors: FormError) {
        this.formError = errors;
        return this;
    }

    checkIsVariableIsDefined<T>(variable: T, name: string) {
        if (variable === undefined || variable === null) {
            this.formError?.errors.push({
                code: RestErrorType.BadParameter,
                reason: `Missing ${name} parameter`
            });
        }

        return this;
    }

    checkPositiveNumber(number: SafeNumber, name: string) {
        if (!number) {
            return this;
        }

        const value = Number(number);
        if (!isNaN(value)) {
            if (value < 1) {
                this.formError?.errors.push({
                    code: RestErrorType.BadParameter,
                    reason: `Invalid number for ${name} must be greater than 0`
                });
            }
        }

        return this;
    }

    checkIsNumber(number: any, name: string) {
        if (!number) {
            return this;
        }

        if (number) {
            const numberValue = Number(number);
            if (isNaN(numberValue)) {
                this.formError?.errors.push({
                    code: RestErrorType.BadParameter,
                    reason: `Invalid number for ${name} must be a number`
                });

                return this;
            }
        }

        return this;
    }

    checkEmail(field: string) {
        if (!field.match(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)) {
            this.formError?.errors.push({
                code: RestErrorType.BadParameter,
                reason: `Invalid email address`
            });
        }

        return this;
    }

    checkLength(field: string, min: number, max: number) {
        if (!field) {
            return this;
        }

        if (field.length < min || field.length > max) {
            this.formError?.errors.push({
                code: RestErrorType.BadParameter,
                reason: `Invalid length for ${field} must be between ${min} and ${max}`
            });
        }

        return this;
    }

    checkMinLength(field: string, min: number) {
        if (!field) {
            return this;
        }

        if (field.length < min) {
            this.formError?.errors.push({
                code: RestErrorType.BadParameter,
                reason: `Invalid length for ${field} must be greater than ${min}`
            });
        }

        return this;
    }

    checkMaxLength(field: string, max: number) {
        if (!field) {
            return this;
        }

        if (field.length > max) {
            this.formError?.errors.push({
                code: RestErrorType.BadParameter,
                reason: `Invalid length for ${field} must be less than ${max}`
            });
        }

        return this;
    }

    checkPattern(field: string, pattern: RegExp) {
        if (!field) {
            return this;
        }

        if (!field.match(pattern)) {
            this.formError?.errors.push({
                code: RestErrorType.BadParameter,
                reason: `Invalid pattern for ${field} must match ${pattern}`
            });
        }

        return this;
    }

    hasSpecialCharacters(field: string) {
        if (!field) {
            return this;
        }

        if (field.match(/[^a-zA-Z0-9]+$/)) {
            this.formError?.errors.push({
                code: RestErrorType.BadParameter,
                reason: `Invalid characters for ${field} must not contain special characters`
            });
        }

        return this;
    }

    hasNumbers(field: string) {
        if (!field) {
            return this;
        }

        if (field.match(/[0-9]+$/)) {
            this.formError?.errors.push({
                code: RestErrorType.BadParameter,
                reason: `Invalid characters for ${field} must not contain numbers`
            });
        }

        return this;
    }

    hasLetters(field: string) {
        if (!field) {
            return this;
        }

        if (field.match(/[a-zA-Z]+$/)) {
            this.formError?.errors.push({
                code: RestErrorType.BadParameter,
                reason: `Invalid characters for ${field} must not contain letters`
            });
        }

        return this;
    }

    hasUppercase(field: string) {
        if (!field) {
            return this;
        }

        if (field.match(/[A-Z]+$/)) {
            this.formError?.errors.push({
                code: RestErrorType.BadParameter,
                reason: `Invalid characters for ${field} must not contain uppercase letters`
            });
        }

        return this;
    }

    hasLowercase(field: string) {
        if (!field) {
            return this;
        }

        if (field.match(/[a-z]+$/)) {
            this.formError?.errors.push({
                code: RestErrorType.BadParameter,
                reason: `Invalid characters for ${field} must not contain lowercase letters`
            });
        }

        return this;
    }

    hasSpaces(field: string) {
        if (!field) {
            return this;
        }

        if (field.match(/ +$/)) {
            this.formError?.errors.push({
                code: RestErrorType.BadParameter,
                reason: `Invalid characters for ${field} must not contain spaces`
            });
        }

        return this;
    }

    isCorrectMinecraftId(field: string) {
        if (!field) {
            return this;
        }

        if (!field.match(/^([a-z0-9_]+):[a-z0-9_]+$/)) {
            this.formError?.errors.push({
                code: RestErrorType.BadParameter,
                reason: `Invalid minecraft id for ${field} must be in the format of namespace:name, here is an example: minecraft:stone, he don't contain uppercase letters or special characters or spaces`
            });
        }

        this.checkMaxLength(field, 80);
        return this;
    }

    isArray(field: string | Array<any>) {
        if (!field) {
            return this;
        }

        if (field instanceof Array) {
            if (!Array.isArray(field)) {
                this.formError?.errors.push({
                    code: RestErrorType.BadParameter,
                    reason: `Invalid array for ${field} must be an array`
                });
            }
        }

        if (typeof field === 'string') {
            if (!Array.isArray(JSON.parse(field))) {
                this.formError?.errors.push({
                    code: RestErrorType.BadParameter,
                    reason: `Invalid array for ${field} must be an array`
                });
            }
        }

        return this;
    }

    addError(code: RestErrorType, reason: string) {
        this.formError?.errors.push({
            code: code,
            reason: reason
        });

        return this;
    }

    getErrors() {
        if (this.formError?.errors.length > 0) {
            return this.formError;
        }

        this.formError.success = true;
        return this.formError;
    }

    hasErrors() {
        return this.formError?.errors.length > 0;
    }
}

export default FormValidator;
