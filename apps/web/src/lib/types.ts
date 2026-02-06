import {  date, z } from "zod";



export type Transaction = z.ob{
    id: string,
    description: string,
    category: string,
    amount: number,
    date: string,
}