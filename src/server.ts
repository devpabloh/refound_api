import {app} from "@/app"

const PORT = 3333

app.listen(PORT, ()=>{
    console.log("Servidor está rodando na porta", PORT)
})