export const CaracterEmail = (email: string) => {
    if (email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    return false;
};