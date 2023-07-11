import routerx from "express-promise-router";
import ProductoRouter from "./productos.route"

const router=routerx();

router.use('/producto',ProductoRouter);

export default router;