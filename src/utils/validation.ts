export const validateEmail = (email: string): string => {
    if (!email) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Please enter a valid email';
    return '';
};

export const validatePassword = (password: string, isConfirm = false): string => {
    if (!password) return isConfirm ? 'Please confirm your password' : 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return '';
};

export const validateName = (name: string): string => {
    if (!name.trim()) return 'Name is required';
    return '';
};

export const validatePasswordMatch = (password: string, confirmPassword: string): string => {
    if (password !== confirmPassword) return 'Passwords do not match';
    return '';
};
