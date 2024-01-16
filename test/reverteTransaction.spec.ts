import { PrismaService } from "../src/Infra/database/prisma"
import { PrismaTransactionRepository } from "../src/Repository/PrismaTransactionRepository"

test('test', async ()=>{

  const prismaService = new PrismaService()
  const prismaTransactionRepository = new PrismaTransactionRepository(prismaService)

  await prismaTransactionRepository.reverseTransactionById('3e52560a-b93d-4e11-9520-30825ff9131c')

  expect(prismaTransactionRepository.reverseTransactionById).toBeTruthy()
})