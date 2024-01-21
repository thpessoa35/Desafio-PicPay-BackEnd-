
export interface ErrosSenha {
    comprimento?: string;
    maiuscula?: string;
    minuscula?: string;
    numero?: string;
    espacos?: string;
}


export const ValidatorPassword = (password: string): { valido: boolean, erros?: ErrosSenha } => {
    const erros: ErrosSenha = {};

    if (password.length < 8) {
        erros.comprimento = "A senha deve ter no mínimo 8 caracteres.";
    }

    if (!/[A-Z]/.test(password)) {
        erros.maiuscula = "A senha deve conter pelo menos uma letra maiúscula.";
    }

    if (!/[a-z]/.test(password)) {
        erros.minuscula = "A senha deve conter pelo menos uma letra minúscula.";
    }

    if (!/\d/.test(password)) {
        erros.numero = "A senha deve conter pelo menos um número.";
    }

    if (/\s/.test(password)) {
        erros.espacos = "A senha não pode conter espaços em branco.";
    }

    return {
        valido: Object.keys(erros).length === 0,
        erros: Object.keys(erros).length > 0 ? erros : undefined,
    };
};

export default ValidatorPassword;
