import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// Создаем сервер и передаем обработчики
export const worker = setupWorker(...handlers);
