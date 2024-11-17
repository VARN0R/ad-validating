import { http } from "msw";

export const handlers = [
  http.post("http://localhost:3000/api/v1/ad", async ({ request }) => {
    const body = await request.json();

    return new Response(JSON.stringify(body), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
];

// http.get("http://localhost:3000/api/v1/ad", ({params}) => {
//   // Фейковые данные для тестирования
//   const mockAds = [
//     {
//       id: 1,
//       title: "Sample Ad 1",
//       description: "Description of sample ad 1",
//       price: 100,
//     },
//     {
//       id: 2,
//       title: "Sample Ad 2",
//       description: "Description of sample ad 2",
//       price: 200,
//     },
//   ];

//   return res(ctx.status(200), ctx.json(mockAds));
// })
