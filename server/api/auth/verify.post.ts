export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { password } = body;

    const CORRECT_PASSWORD = process.env.PROJECT_PASSWORD;

    if (password === CORRECT_PASSWORD) {
        return {
            success: true,
            message: 'Password verified successfully'
        };
    }
    else {
        return {
            success: false,
            message: 'Incorrect password'
        };
    }
});
