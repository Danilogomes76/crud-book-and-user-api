import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
  const showBooks = req.query.books === "true" ? true : false;
  const allUsers = await prisma.user.findMany({
    include: { books: showBooks ? true : false },
  });

  res.send(allUsers);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id) {
    res.status(400).send({
      message: "Check the body.",
    });
    return;
  }

  const user = await prisma.user.findUnique({
    where: { id: id },
  });

  if (!user) {
    res.status(400).send({
      message: "User not found",
    });
    return;
  }

  await prisma.book.deleteMany({
    where: {
      user_id: id,
    },
  });

  const deleteUser = await prisma.user.delete({
    where: { id: id },
  });

  res.send(deleteUser);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  const alredyInTable = await prisma.user.findMany({
    where: { email: email },
  });

  if (alredyInTable.length > 0) {
    res.status(400).send({
      message: "failed to create a user",
    });
    return;
  }

  await prisma.user.create({
    data: {
      name,
      email,
    },
  });

  res.status(201).send({
    message: "created user sucess",
    userData: { name, email },
  });
};
