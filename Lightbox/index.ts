import { IInputs, IOutputs } from "./generated/ManifestTypes";

/**
 * Lightbox PCF Component
 * Permite mostrar una galería de imágenes con lightbox y captions editables.
 */
export class Lightbox implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private container: HTMLDivElement;
    private images: { src: string, caption: string }[] = [];
    private currentSlide = 0;

    private modal: HTMLDivElement | null = null;
    private captionContainer: HTMLDivElement | null = null;
    private slideElements: HTMLDivElement[] = [];
    private thumbnailElements: HTMLImageElement[] = [];

    /**
     * Inicializa el componente y renderiza la galería.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this.container = container;
        this.render(context);
    }

    /**
     * Llama cuando cambian las propiedades o el contexto.
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        this.render(context);
    }

    /**
     * Limpia el DOM cuando el componente se destruye.
     */
    public destroy(): void {
        this.container.innerHTML = "";
    }

    /**
     * Renderiza la galería y el modal lightbox.
     */
    private render(context: ComponentFramework.Context<IInputs>): void {
        // Limpia el contenedor
        this.container.innerHTML = "";

        // Obtiene las imágenes desde la propiedad (espera un JSON string)
        try {
            this.images = JSON.parse(context.parameters.images.raw || "[]");
        } catch {
            this.images = [];
        }

        // Renderiza la galería de miniaturas
        const row = document.createElement("div");
        row.className = "row";
        this.images.forEach((img, idx) => {
            const col = document.createElement("div");
            col.className = "column";
            const image = document.createElement("img");
            image.src = img.src;
            image.alt = img.caption;
            image.style.width = "100%";
            image.className = "hover-shadow cursor";
            image.onclick = () => this.openModal(idx);
            col.appendChild(image);
            row.appendChild(col);
        });
        this.container.appendChild(row);

        // Renderiza el modal (lightbox)
        this.modal = document.createElement("div");
        this.modal.className = "modal";
        this.modal.style.display = "none";
        this.modal.innerHTML = ""; // Limpia

        // Botón cerrar
        const closeBtn = document.createElement("span");
        closeBtn.className = "close cursor";
        closeBtn.innerHTML = "&times;";
        closeBtn.onclick = () => this.closeModal();
        this.modal.appendChild(closeBtn);

        // Contenido del modal
        const modalContent = document.createElement("div");
        modalContent.className = "modal-content";

        // Slides
        this.slideElements = [];
        this.images.forEach((img, idx) => {
            const slide = document.createElement("div");
            slide.className = "mySlides";
            slide.style.display = "none";
            slide.style.position = "relative"; // <-- Añade esto

            const numberText = document.createElement("div");
            numberText.className = "numbertext";
            numberText.innerText = `${idx + 1} / ${this.images.length}`;
            slide.appendChild(numberText);

            const image = document.createElement("img");
            image.src = img.src;
            image.style.width = "100%";
            slide.appendChild(image);

            // Botón prev
            const prevBtn = document.createElement("a");
            prevBtn.className = "prev";
            prevBtn.innerHTML = "&#10094;";
            prevBtn.onclick = () => this.plusSlides(-1);
            slide.appendChild(prevBtn);

            // Botón next
            const nextBtn = document.createElement("a");
            nextBtn.className = "next";
            nextBtn.innerHTML = "&#10095;";
            nextBtn.onclick = () => this.plusSlides(1);
            slide.appendChild(nextBtn);

            modalContent.appendChild(slide);
            this.slideElements.push(slide);
        });

        // Caption
        this.captionContainer = document.createElement("div");
        this.captionContainer.className = "caption-container";
        const captionP = document.createElement("p");
        captionP.id = "caption";
        this.captionContainer.appendChild(captionP);
        modalContent.appendChild(this.captionContainer);

        // Miniaturas en el modal
        this.thumbnailElements = [];
        this.images.forEach((img, idx) => {
            const col = document.createElement("div");
            col.className = "column";
            const thumb = document.createElement("img");
            thumb.className = "demo cursor";
            thumb.src = img.src;
            thumb.alt = img.caption;
            thumb.style.width = "100%";
            thumb.onclick = () => this.showSlides(idx);
            col.appendChild(thumb);
            modalContent.appendChild(col);
            this.thumbnailElements.push(thumb);
        });

        this.modal.appendChild(modalContent);
        this.container.appendChild(this.modal);
    }

    /**
     * Abre el modal y muestra la imagen seleccionada.
     */
    private openModal(idx: number) {
        if (!this.modal) return;
        this.modal.style.display = "block";
        this.showSlides(idx);
    }

    /**
     * Cierra el modal.
     */
    private closeModal() {
        if (!this.modal) return;
        this.modal.style.display = "none";
    }

    /**
     * Cambia de slide (siguiente/anterior).
     */
    private plusSlides(n: number) {
        this.showSlides(this.currentSlide + n);
    }

    /**
     * Muestra el slide seleccionado.
     */
    private showSlides(idx: number) {
        if (!this.slideElements.length) return;
        if (idx >= this.slideElements.length) idx = 0;
        if (idx < 0) idx = this.slideElements.length - 1;
        this.currentSlide = idx;

        // Oculta todos los slides
        this.slideElements.forEach(slide => slide.style.display = "none");
        // Quita la clase active de todas las miniaturas
        this.thumbnailElements.forEach(thumb => thumb.className = thumb.className.replace(" active", ""));

        // Muestra el slide actual
        this.slideElements[idx].style.display = "block";
        // Marca la miniatura como activa
        this.thumbnailElements[idx].className += " active";
        // Actualiza el caption
        if (this.captionContainer) {
            const captionP = this.captionContainer.querySelector("p#caption") as HTMLElement;
            if (captionP) captionP.innerText = this.images[idx].caption;
        }
    }

    /**
     * No hay outputs editables.
     */
    public getOutputs(): IOutputs {
        return {};
    }
}
