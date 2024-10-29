"use client";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type Props = {
  buttonText: string;
  url: string;
  filename: string;
};

export default function PDFViewerModal({ buttonText, url, filename }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='default'>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className='h-3/4 max-w-3xl'>
        <div className='flex flex-col'>
          <DialogHeader className='mb-6'>
            <DialogTitle>{filename}</DialogTitle>
          </DialogHeader>
          <embed
            className='w-full h-full flex-1'
            type='application/pdf'
            src={url}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
