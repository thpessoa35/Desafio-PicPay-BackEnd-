import { PrismaService } from "../src/Infra/database/prisma"
import { PrismaTransactionRepository } from "../src/Repository/PrismaTransactionRepository"

test('test', async ()=>{

  const prismaService = new PrismaService()
  const prismaTransactionRepository = new PrismaTransactionRepository(prismaService)

  await prismaTransactionRepository.reverseTransactionById('05b3acb9-2a27-4103-b45d-67dce278b2d7')

  expect(prismaTransactionRepository.reverseTransactionById).toBeTruthy()
})