import { ConfigBuilder } from "../dist/index.js";
import * as Schema from "../src/schema.ts";

function main() {
  const AppSchema = Schema.object({
    name: Schema.string().nonempty(),
    port: Schema.coerce.number(),
    debug: Schema.boolean().default(false),
  });

  const builder = new ConfigBuilder();
  builder.setSchema(AppSchema);
  builder.setDefault("name", "AlloyService");
  builder.setDefault("port", "8080");

  const config = builder.build();

  const validatedData = AppSchema.parse({
    name: config.getString("name"),
    port: config.get("port"),
  });

  console.log("Validated Config:", validatedData);
}

main();
