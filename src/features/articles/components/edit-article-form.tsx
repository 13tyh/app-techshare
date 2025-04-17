'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import EmojiPicker from 'emoji-picker-react';
import {Edit, PlayIcon, Smile} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import {z} from 'zod';

import {Button} from '@/components/ui/button';
import {Form, FormField} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Separator} from '@/components/ui/separator';
import {Textarea} from '@/components/ui/textarea';

import {useUpdateArticle} from '@/features/articles/api/use-update-article';
import {updateArticleSchema} from '@/features/articles/schemes';
import {Article} from '@/features/articles/types';

interface EditArticleFormProps {
  article: Article;
}

export const EditArticleForm = ({article}: EditArticleFormProps) => {
  const router = useRouter();
  const [isPreview, setIsPreview] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const {mutate: updateArticle, isPending: isUpdatingArticle} =
    useUpdateArticle();

  const form = useForm<z.infer<typeof updateArticleSchema>>({
    resolver: zodResolver(updateArticleSchema),
    defaultValues: {
      title: article.title ?? '',
      content: article.content ?? '',
      icon: article.icon ?? '',
    },
  });

  const onSubmit = (values: z.infer<typeof updateArticleSchema>) => {
    updateArticle(
      {
        json: values,
        param: {article_id: article.id},
      },
      {
        onSuccess: () => {},
      },
    );
  };

  const onEmojiClick = (emojiData: any) => {
    form.setValue('icon', emojiData.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-x-4">
            <div className="flex items-center gap-2">
              <FormField
                control={form.control}
                name="icon"
                render={({field}) => (
                  <div className="relative">
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                      {field.value ? (
                        <span className="text-xl">{field.value}</span>
                      ) : (
                        <Smile className="h-4 w-4" />
                      )}
                    </Button>
                    {showEmojiPicker && (
                      <div className="absolute z-50 top-full left-0 mt-2">
                        <EmojiPicker onEmojiClick={onEmojiClick} />
                      </div>
                    )}
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({field}) => (
                  <Input
                    placeholder="Title"
                    className="border-none shadow-none md:text-2xl font-semibold"
                    {...field}
                  />
                )}
              />
            </div>
            <div className="flex-1 gap-12 flex">
              {isPreview ? (
                <div className="bg-neutral-100 p-8 pb-40 min-h-[500px] overflow-auto prose prose-sm md:prose-base lg:prose-lg dark:prose-invert w-full max-w-none prose-pre:bg-dark-800 prose-pre:border prose-pre:border-border">
                  <ReactMarkdown>{form.getValues('content')}</ReactMarkdown>
                </div>
              ) : (
                <FormField
                  control={form.control}
                  name="content"
                  render={({field}) => (
                    <Textarea
                      placeholder="Write your article here..."
                      className="resize-none flex-1 border-none shadow-none"
                      {...field}
                    />
                  )}
                />
              )}
              <div className="flex flex-col gap-2 w-[200px]">
                {!article.publishedAt ? (
                  <p className="text-sm text-muted-foreground bg-yellow-200 rounded-md p-2 mb-2">
                    この記事は非公開です
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground bg-green-200 rounded-md p-2 mb-2">
                    この記事は公開済です
                  </p>
                )}
                <div className="flex gap-2 mb-2">
                  <Button
                    variant={isPreview ? 'outline' : 'default'}
                    onClick={() => setIsPreview(false)}
                    type="button"
                    className="rounded-full"
                    size="icon"
                  >
                    <Edit className="rounded-full" />
                  </Button>
                  <Button
                    variant={isPreview ? 'default' : 'outline'}
                    onClick={() => setIsPreview(true)}
                    type="button"
                    className="rounded-full"
                    size="icon"
                  >
                    <PlayIcon className="rounded-full" />
                  </Button>
                </div>
                <Button type="submit">Save</Button>
                <Separator className="my-2" />
                <div className="space-y-4">
                  {!article.publishedAt ? (
                    <Button
                      type="button"
                      className="w-full"
                      onClick={() => {}}
                      disabled={false}
                    >
                      Publish
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      className="w-full"
                      onClick={() => {}}
                      disabled={false}
                    >
                      Unpublish
                    </Button>
                  )}
                  <Button
                    type="button"
                    className="w-full"
                    onClick={() => {}}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
