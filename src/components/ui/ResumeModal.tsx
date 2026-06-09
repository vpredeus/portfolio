type ResumeModalProps = {
  resumeUrl: string;
  onClose: () => void;
};

export function ResumeModal({ resumeUrl, onClose }: ResumeModalProps) {
  return (
    <div className="resume-modal-overlay" onClick={onClose}>
      <div
        className="resume-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="resume-modal-header">
          <div>
            <span className="section-label">Currículo</span>
            <h2>Pré-visualização do currículo</h2>
          </div>

          <button
            type="button"
            className="resume-close-button"
            onClick={onClose}
            aria-label="Fechar pré-visualização do currículo"
          >
            ×
          </button>
        </div>

        <div className="resume-preview">
          <iframe
            src={resumeUrl}
            title="Pré-visualização do currículo de João Victor Predeus"
          />
        </div>

        <div className="resume-modal-actions">
          <a
            href={resumeUrl}
            download
            className="primary-button"
          >
            Baixar currículo
          </a>

          <a
            href={resumeUrl}
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