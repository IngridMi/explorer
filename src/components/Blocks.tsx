import { useMemo } from 'react';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Link from 'next/link';

import { getMinerAlias } from '../modules/getters';
import { EthLogo, EdenLogo } from '../modules/icons';

TimeAgo.addDefaultLocale(en);

export default function Blocks({
  blocks,
  edenProducerOnly,
}: {
  blocks: {
    number: number;
    author: string;
    timestamp: number;
    slotTxs: number;
    bundledTxs: number;
    stakerTxs: number;
    fromActiveProducer: boolean;
    bundledTxsCallSuccess: boolean;
  }[];
  edenProducerOnly: boolean;
}) {
  const timeAgo = useMemo(() => new TimeAgo('en-US'), []);

  const shapedBlocks = useMemo(
    () =>
      blocks.map((block) => {
        return {
          number: block.number,
          fromActiveProducer: block.fromActiveProducer,
          author: getMinerAlias(block.author) || block.author,
          timestamp: timeAgo.format(block.timestamp * 1000),
          bundledTxsCallSuccess: block.bundledTxsCallSuccess,
          bundledTxs: block.bundledTxs,
          stakerTxs: block.stakerTxs,
          slotTxs: block.slotTxs,
        };
      }),
    [blocks, timeAgo]
  );

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-x-auto sm:rounded-lg">
            <table className="min-w-full">
              <thead className="bg-blue-light">
                <tr>
                  <th
                    scope="col"
                    className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Number
                  </th>
                  <th
                    scope="col"
                    className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Time
                  </th>
                  {!edenProducerOnly && (
                    <th
                      scope="col"
                      className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Block Type
                    </th>
                  )}
                  <th
                    scope="col"
                    className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Producer
                  </th>
                  <th
                    scope="col"
                    className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Slot Txs
                  </th>
                  <th
                    scope="col"
                    className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Bundled Txs
                  </th>
                  <th
                    scope="col"
                    className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Staker Txs
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-light">
                {shapedBlocks.map((block) => (
                  <tr key={block.number}>
                    <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
                      <Link href={`/block/${block.number}`}>
                        <a className="text-green">
                          {block.number.toLocaleString()}
                        </a>
                      </Link>
                    </td>
                    <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
                      {block.timestamp}
                    </td>
                    {!edenProducerOnly && (
                      <td className="px-0 sm:px-0 pt-2 w-6 whitespace-nowrap text-center">
                        <span className="w-3 h-3">
                          {block.fromActiveProducer ? EdenLogo : EthLogo}
                        </span>
                      </td>
                    )}
                    <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
                      {block.author}
                    </td>
                    <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                      {block.slotTxs}
                    </td>
                    <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                      {block.bundledTxs > 0 || block.bundledTxsCallSuccess
                        ? block.bundledTxs
                        : '?'}
                    </td>
                    <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                      {block.stakerTxs}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
