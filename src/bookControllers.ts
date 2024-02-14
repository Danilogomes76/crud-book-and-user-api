import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const saveBookToUser = async (req: Request, res: Response) => {
  const { userId, name, authors, description, categories } = req.body;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    res.status(400).send({
      message: "Failed to save a book.",
    });
    return;
  }

  await prisma.book.create({
    data: {
      user_id: userId,
      name,
      authors,
      description,
      categorie: categories,
    },
  });

  res.status(201).send({
    message: "Book saved correctly for user",
    userData: { userId, name, authors, description, categories },
  });
};

export const deleteBookUser = async (req: Request, res: Response) => {
  const { bookId } = req.body;

  if (!bookId) {
    res.status(400).send({
      message: "Check the body.",
    });
    return;
  }

  const book = await prisma.book.findUnique({
    where: { bookId: bookId },
  });

  if (!book) {
    res.status(400).send({
      message: "No have book with this Id",
    });
    return;
  }

  const deletedBook = await prisma.book.delete({
    where: {
      bookId: bookId,
    },
  });

  res.send(deletedBook);
};
