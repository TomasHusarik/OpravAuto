// Helper function to generate access code
export const generateAccessCode = (): string => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
}