'use server';

import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';
import { isDev } from '@/constants';
import { TTopicId } from '@/features/topics/types';

import { TQuestion } from '../types';

export async function getTopicQuestions(topicId: TTopicId) {
  // Check user rights to delete the question...?
  const user = await getCurrentUser();
  const userId = user?.id;
  // Check user rights to delete the question...
  const topic = await prisma.topic.findUnique({
    where: { id: topicId },
  });
  if (!topic) {
    throw new Error('Not found owner topic');
  }
  if (!topic.isPublic && userId !== topic?.userId && user?.role !== 'ADMIN') {
    throw new Error('Current user is not allowed to access the topic questions');
  }
  try {
    if (isDev) {
      // DEBUG: Emulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    const questions: TQuestion[] = await prisma.question.findMany({
      where: { topicId },
    });
    return questions;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[getTopicQuestions] catch', {
      error,
    });
    debugger; // eslint-disable-line no-debugger
    throw error;
  }
}
