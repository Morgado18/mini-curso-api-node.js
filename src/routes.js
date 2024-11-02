
import { Router } from "express";
import SelecaoController from "./app/controllers/SelecaoController.js";
import LoginController from "./app/controllers/LoginController.js";
const router = Router();

router.get("/selecoes", SelecaoController.index)  
router.get("/selecoes/:id", SelecaoController.show)  
router.post("/selecoes", SelecaoController.store)
router.put("/selecoes/:id", SelecaoController.update)
router.delete("/selecoes/:id", SelecaoController.delete)

router.post('/login', LoginController.auth)
router.post('/register', LoginController.register)

export default router;
