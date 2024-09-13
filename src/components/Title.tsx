import React from "react";

interface TitleProps {
    title: string;
}
export default function Title({ title }: TitleProps) {
    return (
        <div className={'flex flex-col gap-1'}>
            <span className={'font-medium text-3xl uppercase'}>{title}</span>
            <div className={'h-[2px] bg-slate-800'}></div>
        </div>
    )

}