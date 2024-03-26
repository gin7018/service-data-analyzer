import fs from "fs";


export async function load_data(file, Record) {
    try {
        const data = fs.readFileSync(file, 'utf8').split('\n');
        let schema_fields = Object.keys(Record.schema.paths);
        for (let i = 0; i < data.length; i++) {
            let line = data[i];
            let values = line.split('$#$');

            let record = new Record();
            schema_fields.forEach((field, index) => {
                record[field] = values[index];
            })
            await record.save();
        }
        console.log(`[LOAD API DATA] status=success; collection=${Record.toString()}`);

    } catch (e) {
        console.error(`[LOAD API DATA] status=failed; error=${e.message}`);
    }
}