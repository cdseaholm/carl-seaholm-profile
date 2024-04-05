'use server'

import { Hobby } from '@/types/hobby';
import { prisma } from '@/db';
import { notFound } from 'next/navigation';
import { ActualUser } from '@/types/user';

export default async function fetchHobbies({user}: {user: ActualUser}): Promise<Hobby[]> { 

    if (!user) {
        return notFound();
    }
    const hobbies = await prisma.hobby.findMany({
        where: {
            userId: user.id
        }
    })

    if (!hobbies) {
        return notFound();
    }

    return hobbies;
}

export async function fetchUserByName(title: string): Promise<Hobby | null> {
    const post = await prisma.hobby.findFirst({
        where: {
            title: title,
        }
    })

    if (!post) {
        notFound()
    }

    return post
}