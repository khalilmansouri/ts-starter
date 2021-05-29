import "reflect-metadata"
import { Container } from "typedi";
import { Mongo } from "@dataAccess/mongodb";
import { app } from "@http/index"


const main = async () => {
  await Container.get(Mongo).connect()
  app.listen(5000, () => { console.log("Server is listring on 5000") })
}

main()