type PitchPdfModalProps = {
  projectName: string;
  pdfUrl: string;
  onClose: () => void;
};

export function PitchPdfModal({
  projectName,
  pdfUrl,
  onClose,
}: PitchPdfModalProps) {
  const pdfPreviewUrl = `${pdfUrl}#toolbar=0&navpanes=0`;

  return (
    <div className="pitch-pdf-modal-overlay" onClick={onClose}>
      <div
        className="pitch-pdf-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="pitch-pdf-modal-header">
          <div>
            <span className="section-label">Apresentação</span>
            <h2>{projectName}</h2>
          </div>

          <button
            type="button"
            className="pitch-pdf-close-button"
            onClick={onClose}
            aria-label="Fechar apresentação"
          >
            ×
          </button>
        </div>

        <div className="pitch-pdf-preview">
          <iframe
            src={pdfPreviewUrl}
            title={`Apresentação do projeto ${projectName}`}
          />
        </div>

        <div className="pitch-pdf-modal-actions">
          <a href={pdfUrl} download className="primary-button">
            Baixar apresentação
          </a>

          <a
            href={pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="secondary-button"
          >
            Abrir em nova aba
          </a>
        </div>
      </div>
    </div>
  );
}