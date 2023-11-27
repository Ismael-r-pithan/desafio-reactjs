import * as yup from "yup";

export const signUpValidator = yup.object({
    email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
    name: yup.string().required('Informe o username'),
    password: yup.string().required('Informe a senha'),
    password_confirm: yup.string().required('Confirme a senha').oneOf([yup.ref('password')], 'A Confirmação da senha não confere')
});
