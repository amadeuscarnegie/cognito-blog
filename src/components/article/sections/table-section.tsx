import type { TableSection as TableSectionType } from "@/types/article";

export function TableSection({ headers, rows }: TableSectionType) {
	return (
		<div className="rounded-md border-[1.5px] border-border-quaternary overflow-hidden">
			<div className="overflow-x-auto">
				<table className="w-full border-collapse">
					<thead>
						<tr className="bg-[#d1eafd]">
							{headers.map((header, i) => (
								<th
									key={i}
									className="px-4 py-3 text-left font-heading font-bold text-sm text-text-primary border-r border-border-quaternary last:border-r-0"
								>
									{header}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{rows.map((row, rowIndex) => (
							<tr
								key={rowIndex}
								className={
									rowIndex % 2 === 0 ? "bg-white" : "bg-bg-subtle"
								}
							>
								{row.map((cell, cellIndex) => (
									<td
										key={cellIndex}
										className="px-4 py-3 font-body font-medium text-sm text-text-primary border-r border-border-quaternary last:border-r-0 border-t border-border-quaternary"
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
	);
}
