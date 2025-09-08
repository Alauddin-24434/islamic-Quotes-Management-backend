import { Application, Router } from "express";

import { authRoutes } from "../routess/auth.routes";
import { userRoutes } from "../routess/user.routes";
import { quoteRoutes } from "../routess/quote.routes";

const allApiRoutes =[
    {
        path:"/api/auth",
        route: authRoutes
    },
    {
        path:"/api/users",
        route: userRoutes
    },
    {
        path:"/api/quotes",
        route: quoteRoutes
    }
]


export const mainRoute= ( app:Application)=>{
  allApiRoutes.forEach((route)=> app.use(route.path, route.route))
}