import React from "react";
import Modal from "react-modal";
import "./TestReportModal.css";
const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		width: "50vw",
		transform: "translate(-50%, -50%)",
		background: "#fff",
		fontSize: "16px",
	},
};
const data = [
	{ id: "L1", data: [1, 2, 3] },
	{ id: "L1", data: [1, 2, 3, 4] },
	{ id: "L1", data: [1] },
	{ id: "L1", data: [] },
];
const TestReportModal = ({ testmodalOpen, setTestModalOpen }) => {
	return (
		<Modal
			isOpen={testmodalOpen}
			style={customStyles}
			onRequestClose={() => setTestModalOpen(false)}
		>
			<div className="test_Report_table">
				<h1>Test Report</h1>
				<div>
					<ul class="legal_responsive_table2">
						<li class="table-header2">
							<div class="test_Report_modal_col_1">S No.</div>
							<div class="test_Report_modal_col_2">Test Name</div>
							<div class="test_Report_modal_col_3">Value</div>
						</li>
						{data?.map((item, index) => {
							return (
								<>
									<li class="table-row2" key={index}>
										<div class="test_Report_modal_col_1">{index + 1}</div>
										<div class="test_Report_modal_col_2">aa/a/aa</div>
										<div class="test_Report_modal_col_3">
											{item?.doctor?.name ?? "-"}{" "}
										</div>
									</li>
									{item.data.length
										? item.data.map((item) => (
												<li class="table-row2 sub_table_row" key={index}>
													<div className="test_Report_modal_col_1"></div>
													<div class="test_Report_modal_col_2">aa/a/aa</div>
													<div class="test_Report_modal_col_3">
														{item?.doctor?.name ?? "-"}{" "}
													</div>
												</li>
										  ))
										: null}
								</>
							);
						})}
					</ul>
				</div>
			</div>
		</Modal>
	);
};

export default TestReportModal;
