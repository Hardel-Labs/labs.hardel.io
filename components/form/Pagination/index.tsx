'use client';

import { useState } from 'react';
import ArrowBack from '@icons/Common/ArrowBack';
import ArrowNext from '@icons/Common/ArrowNext';

type Props = {
    numberData: number;
    numberElementPerPage: number;
    siblingPage: number;
    defaultPage?: number;
    onChange?: (page: number) => void;
};

const range = (min: number, max: number) => Array.from({ length: max - min + 1 }, (_, idx) => idx + min);
const DOTS = '...';

const arrayPage = (numberData: number, numberElementPerPage: number, siblingPage: number, currentPage: number): Array<number | string> => {
    const totalPageCount = Math.ceil(numberData / numberElementPerPage);
    const leftSiblingIndex = Math.max(currentPage - siblingPage, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingPage, totalPageCount);
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;
    const leftRange = range(1, 3 + 2 * siblingPage);
    const rightRange = range(totalPageCount - (3 + 2 * siblingPage) + 1, totalPageCount);
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);

    if (siblingPage + 5 >= totalPageCount) return range(1, totalPageCount);
    else if (!shouldShowLeftDots && shouldShowRightDots) return [...leftRange, DOTS, totalPageCount];
    else if (shouldShowLeftDots && !shouldShowRightDots) return [1, DOTS, ...rightRange];
    else return [1, DOTS, ...middleRange, DOTS, totalPageCount];
};

export default function Pagination(props: Props) {
    const [page, setPage] = useState(props.defaultPage ?? 1);
    const displayPage = arrayPage(props.numberData, props.numberElementPerPage, props.siblingPage, page);

    const handleChange = (page: number) => {
        setPage(page);
        props.onChange && props.onChange(page);
    };

    return (
        <nav>
            <ul className={'flex items-center gap-x-1 list-none p-0 m-0'}>
                <li>
                    <button disabled={page <= 1} className={'pagination-button'} aria-label="Previous Page" onClick={() => handleChange(page - 1)}>
                        <ArrowBack className={'w-4 h-4 flex justify-center items-center'} />
                    </button>
                </li>

                {displayPage.map((element, i) => {
                    return element === DOTS ? (
                        <li key={i}>
                            <span className={'pagination-button'}>{element}</span>
                        </li>
                    ) : (
                        <li key={i}>
                            <button className={'pagination-button ' + (page === element ? 'bg-white/10 font-bold text-gold' : '')} onClick={() => handleChange(+element)}>
                                {element}
                            </button>
                        </li>
                    );
                })}

                <li>
                    <button
                        disabled={page >= Math.ceil(props.numberData / props.numberElementPerPage)}
                        className={'pagination-button'}
                        aria-label="Next Page"
                        onClick={() => handleChange(page + 1)}
                    >
                        <ArrowNext className={'w-4 h-4 flex justify-center items-center'} />
                    </button>
                </li>
            </ul>
        </nav>
    );
}
