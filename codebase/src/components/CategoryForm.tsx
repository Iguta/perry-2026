import { useState } from 'react'

type CategoryFormProps = {
  onAdd: (name: string, color: string) => void
}

const colors = ['#7C9AFF', '#4AD6B8', '#F4A261', '#C77DFF', '#F6BD60', '#84DCC6']

export const CategoryForm = ({ onAdd }: CategoryFormProps) => {
  const [name, setName] = useState('')
  const [color, setColor] = useState(colors[0])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!name.trim()) {
      return
    }
    onAdd(name.trim(), color)
    setName('')
    setColor(colors[0])
  }

  return (
    <form className="form form--compact" onSubmit={handleSubmit}>
      <label className="form__field">
        New category
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g. Family"
        />
      </label>
      <label className="form__field">
        Color
        <select value={color} onChange={(event) => setColor(event.target.value)}>
          {colors.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <button type="submit" className="ghost-button">
        Add category
      </button>
    </form>
  )
