import "server-only";

import { db } from "../lib/db";
import {
  UserCreateRequestType,
  UserResponseType,
  UserUpdateRequestType,
} from "../schemas/users";

export const UsersRepository = {
  // ユーザーの存在確認
  async exists(userId: number): Promise<boolean> {
    const user = await db.user.findUnique({
      where: { id: userId },
    });
    return !!user;
  },

  async findById(userId: number): Promise<UserResponseType | null> {
    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        hobbies: {
          select: {
            name: true,
          },
        },
      },
    });
    return user;
  },

  async create(userData: UserCreateRequestType): Promise<UserResponseType> {
    const user = await db.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        age: userData.age,
        hobbies: {
          create: userData.hobbies.map((hobby) => ({
            name: hobby.name,
          })),
        },
      },
      include: {
        hobbies: {
          select: {
            name: true,
          },
        },
      },
    });
    return user;
  },

  async update(
    userId: number,
    updateData: UserUpdateRequestType,
  ): Promise<UserResponseType> {
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        name: updateData.name,
        age: updateData.age,
        hobbies: updateData.hobbies
          ? {
              deleteMany: {},
              create: updateData.hobbies.map((hobby) => ({
                name: hobby.name,
              })),
            }
          : undefined,
      },
      include: {
        hobbies: {
          select: {
            name: true,
          },
        },
      },
    });

    // スキーマと一致する形に変換
    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      age: updatedUser.age,
      hobbies: updatedUser.hobbies.map((hobby) => ({
        name: hobby.name,
      })),
    };
  },

  async delete(userId: number) {
    return await db.user.delete({
      where: { id: userId },
    });
  },
};
