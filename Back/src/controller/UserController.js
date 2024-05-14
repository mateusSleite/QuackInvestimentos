const User = require("../model/User");

class UserController {
    static async register(req, res) {
        const { name, email, password, confirmPassword, cpf, birth } = req.body;
        if (!name) return res.status(400).send({ message: "Nome é obrigatório" });
        if (!email) return res.status(400).send({ message: "Email é obrigatório" });
        if (!password) return res.status(400).send({ message: "Senha é obrigatório" });
        if (password != confirmPassword) return res.status(400).send({ message: "As senhas não são iguais" });
        if (!cpf) return res.status(400).send({ message: "CPF é obrigatório" });
        if (!birth) return res.status(400).send({ message: "Data de nascimento é obrigatória" });

        const emailExist = await User.findOne({ email: email });
        if (emailExist) return res.status(422).send({ message: "Já existe conta nesse e-mail" });

        const cpfExist = await User.findOne({ cpf: cpf });
        if (cpfExist) return res.status(422).send({ message: "Já existe conta nesse cpf" });


        const user = new User({
            name,
            email,
            password,
            cpf,
            birth,
            extract: null,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            removedAt: null,
        });

        try {
            await User.create(user);
            res.status(201).send({ message: "Usuário cadastrado com sucesso" });
        } catch (error) {
            return res
                .status(500)
                .send({ message: "Erro ao cadastrar", data: error.message });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password)
                return res.status(400).send({ menssage: "E-mail e senha são obrigatórios" });

            const user = await User.findOne({ email });
            if (!user) return res.status(404).send({ message: "Email não existente" });

            const passwordUser = await User.findOne({ password })
            if (!passwordUser) return res.status(401).send({ menssage: "Senhao não existente" })

            res.status(200).send({ message: "Login bem-sucedido" });
        } catch (error) {
            return res
                .status(500)
                .send({ message: "Erro ao logar!", data: error.menssage });
        }
    }
}

module.exports = UserController;