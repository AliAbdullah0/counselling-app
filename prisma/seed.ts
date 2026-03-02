import prisma from '@/lib/prisma' 
import bcrypt from 'bcryptjs'

async function main() {
    const password = 'admin123'
    const hashed = await bcrypt.hash(password,10)
    const admin = await prisma.admin.create({
    data:{
        username:'admin',
        password:hashed,
        email:"aliabdullah10nov2006@gmail.com",
    }
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })