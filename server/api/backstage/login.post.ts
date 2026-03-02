export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { account, password } = body;

    const CORRECT_ACCOUNT = process.env.BACKSTAGE_ACCOUNT;
    const CORRECT_PASSWORD = process.env.BACKSTAGE_PASSWORD;

    if (account === CORRECT_ACCOUNT && password === CORRECT_PASSWORD) {
        return {
            success: true,
            message: '登入成功'
        };
    }
    else {
        return {
            success: false,
            message: '帳號或密碼錯誤'
        };
    }
});
