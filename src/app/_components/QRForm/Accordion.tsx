
interface AccordionProps {
  setBgColor: (value: string) => void
  bgColor: string
  setFgColor: (value: string) => void
  fgColor: string
  setInputMargin: (value: string) => void
  inputMargin: string
}

export default function Accordion(props: AccordionProps) {
  const inputClass = "input input-block"

  return (
    <div className="accordion-group">
      <div className="accordion" >
        <input type="checkbox" id="accordion-1" className="accordion-toggle" />
        <label htmlFor="accordion-1" className="accordion-title text-base bg-dark-midnight">Options</label>
        <span className="accordion-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
          </svg>
        </span>
        <div className="accordion-content">
          <div className="min-h-0  ">
            <div className="form-field">
              <label className="form-label">Background color:</label>
              <div className="flex gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="#151f42"
                    className={inputClass}
                    value={props.bgColor}
                    onChange={(e) => props.setBgColor(e.target.value)}
                  />
                </div>
                <div className="self-center">
                  <input
                    type="color"
                    className="w-[4.5rem] h-8 rounded-md"
                    onChange={(e) => props.setBgColor(e.target.value)}
                    value={props.bgColor}
                  />
                </div>
              </div>
            </div>

            <div className="form-field pt-4">
              <label className="form-label">Foreground color:</label>
              <div className="flex gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="#151f42"
                    className={inputClass}
                    value={props.fgColor}
                    onChange={(e) => props.setFgColor(e.target.value)}
                  />
                </div>
                <div className="self-center">
                  <input
                    type="color"
                    className="w-[4.5rem] h-8 rounded-md"
                    onChange={(e) => props.setFgColor(e.target.value)}
                    value={props.fgColor}
                  />
                </div>
              </div>
            </div>

            <div className="form-field pt-4">
              <label className="form-label">Margin:</label>
              <div className="flex gap-6">
                <p className="bg-white/10 rounded-md w-14 text-center py-1">{props.inputMargin}</p>
                <input
                  type="range"
                  min="0"
                  max="5"
                  defaultValue="3"
                  className="range range-flat-secondary self-center w-1/2"
                  onChange={(e) => props.setInputMargin(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}