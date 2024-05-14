const Investiment = require("../model/Investiment");

class InvestimentController {
    static async createInvestiment(req, res) {
        const { userId, nameInvestment, value, startDate, endDate, category, isInput } = req.body
        const investiment = new Investiment({
            userId,
            nameInvestment,
            value,
            startDate,
            endDate,
            category,
            isInput,
            extract: null,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            removedAt: null,
        });
        try {
            await Investiment.create(investiment);
            res.status(201).send({ message: "Investimneto cadastrado" });
        } catch (error) {
            return res.status(500).send({ message: "Erro ao cadastrar investimento", data: error.menssage })
        }

    }

    static async getAll(req, res) {
        try {
            const investiments = await Investiment.find();
            res.status(200).json(investiments);
        }
        catch (error) {
            return res.status(500).send({ message: "Erro ao mostrar investimentos", data: error.message });
        }
    }
    
    static async getID(req, res) {
        const { id } = req.params;
        try {
            const investiment = await Investiment.findById(id)
            if (!investiment) return res.status(404).json({ message: "Investimento não encontrado", data: error.message })

            res.status(200).json(investiment);
        } catch (error) {
            return res.status(500).send({ message: "Erro ao encontrar investimento", data: error.menssage })

        }
    }

    static async updateInvestment(req, res) {
        const { id } = req.params;
        const updateData = req.body;
    
        try {
            const existingInvestment = await Investiment.findById(id);
            if (!existingInvestment) return res.status(404).send({ message: "Investimento não encontrado" });
    
            if (updateData.nameInvestment !== undefined) {
                existingInvestment.nameInvestment = updateData.nameInvestment;
            }
            if (updateData.value !== undefined) {
                existingInvestment.value = updateData.value;
            }
            if (updateData.startDate !== undefined) {
                existingInvestment.startDate = updateData.startDate;
            }
            if (updateData.endDate !== undefined) {
                existingInvestment.endDate = updateData.endDate;
            }
            if (updateData.category !== undefined) {
                existingInvestment.category = updateData.category;
            }
            if (updateData.isInput !== undefined) {
                existingInvestment.isInput = updateData.isInput;
            }
    
            const updatedInvestment = await existingInvestment.save();
    
            res.status(200).send({ message: "Investimento atualizado", updatedInvestment });
        } catch (error) {
            return res.status(500).send({ message: "Erro ao atualizar investimento", data: error.message });
        }
    }
    
    static async deleteInvestiment(req, res) {
        const { id } = req.params;
        try {
            const investiment = await Investiment.findById(id);
            if (!investiment) return res.status(404).send({ message: "Investimneto não encontrado", data: error.message })

            await Investiment.findByIdAndDelete(id);
            res.status(200).send({ message: "Investimneto deletado" });

        } catch (error) {
            return res.status(500).send({ message: "Erro deletar investimento", data: error.menssage })
        }

    }

}

module.exports = InvestimentController;