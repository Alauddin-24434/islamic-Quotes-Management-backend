import { Application } from "express";

import { authRoutes } from "../routess/auth.routes";

const allApiRoutes =[
    {
        path:"/api/auth",
        route: authRoutes
    }
]


export const mainRoute= ( app:Application)=>{
  allApiRoutes.forEach((route)=> app.use(route.path, route.route))
}