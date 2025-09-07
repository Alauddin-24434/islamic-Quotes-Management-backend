import { Application } from "express";

import { authRoutes } from "../routess/auth.routes";
import { userRoutes } from "../routess/user.routes";

const allApiRoutes =[
    {
        path:"/api/auth",
        route: authRoutes
    },
    {
        path:"/api/users",
        route: userRoutes
    }
]


export const mainRoute= ( app:Application)=>{
  allApiRoutes.forEach((route)=> app.use(route.path, route.route))
}