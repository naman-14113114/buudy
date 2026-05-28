import { comparison } from "@/data/productSections";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ComparisonTable() {
  return (
    <section className="buudy-section bg-[var(--cream)] py-24">
      <div className="buudy-wrap">
        <SectionHeading
          eyebrow="Compared"
          title={
            <>
              Why Buudy is <em className="buudy-italic">right for you</em>.
            </>
          }
          copy={comparison.intro}
        />

        <div className="mt-12 overflow-x-auto rounded-[18px] border border-[var(--border)] bg-[var(--card)]">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[rgba(241,223,210,.42)]">
                <th className="buudy-mono p-5 text-[var(--plum)]">Feature</th>
                {comparison.columns.map((column) => (
                  <th
                    className={`p-5 ${
                      column.featured
                        ? "bg-[var(--plum)] text-[var(--cream)]"
                        : "text-[var(--plum)]"
                    }`}
                    key={column.label}
                  >
                    <p className="buudy-display text-2xl">{column.label}</p>
                    <p
                      className={`buudy-mono mt-1 ${
                        column.featured ? "text-[var(--gold)]" : "text-[var(--muted)]"
                      }`}
                    >
                      {column.price}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row) => (
                <tr className="border-b border-[var(--border)] last:border-0" key={row[0]}>
                  <td className="buudy-display p-5 text-[var(--plum)]">{row[0]}</td>
                  {row.slice(1).map((cell, index) => (
                    <td
                      className={`p-5 text-sm ${
                        index === 0
                          ? "bg-[rgba(58,31,61,.05)] font-semibold text-[var(--plum)]"
                          : "text-[var(--muted)]"
                      }`}
                      key={`${row[0]}-${index}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
