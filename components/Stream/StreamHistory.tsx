import { DisclosureState } from 'ariakit';
import { FormDialog } from 'components/Dialog';
import { useChainExplorer } from 'hooks';
import React from 'react';
import { IStream } from 'types';

interface StreamHistoryProps {
  data: IStream;
  dialog: DisclosureState;
  title: string;
}

export const StreamHistory = ({ data, dialog, title }: StreamHistoryProps) => {
  const historicalData = data.historicalEvents;
  const { url: chainExplorer, name: explorerName } = useChainExplorer();
  return (
    <>
      <FormDialog dialog={dialog} title={title} className="v-min h-min">
        <section>
          <table className="w-full">
            <tbody>
              {historicalData.map((p) => (
                <tr className="border" key={p.txHash}>
                  <td className="font-inter border text-left text-sm">{p.eventType.replace(/([A-Z])/g, ' $1')}</td>
                  <td className="font-inter border text-center text-sm">
                    {new Date(Number(p.createdTimestamp) * 1e3).toLocaleString('en-CA', { hour12: false })}
                  </td>
                  <td className="font-inter border text-center text-sm">
                    <a
                      href={`${chainExplorer}/tx/${p.txHash}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="underline"
                    >{`View on ${explorerName}`}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </FormDialog>
    </>
  );
};