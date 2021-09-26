import prisma from "../../lib/prisma";
export default async function assetHandler(req, res) {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const facts = await prisma.fact.findMany();
                res.status(200).json(facts);
            } catch (e) {
                console.log("Request error", e);
                res.status(500).json({error: "Error fetching facts"});
            }
            break;
        default:
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}