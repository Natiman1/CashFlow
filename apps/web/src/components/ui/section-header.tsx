

const SectionHeader = ({label, title, description, className}: {label?: string, title: string, description: string, className?: string}) => {
  return (
    <div className="text-center">
        <p className={"text-300 md:text-400 font-semibold uppercase text-gray-900" + (className ? ` ${className}` : "")}>{label}</p>
        <h2 className={"text-800 md:text-1000 font-medium text-gray-900" + (className ? ` ${className}` : "")}>{title}</h2>
        <p className={"text-300 md:text-400 text-gray-400"  + (className ? ` ${className}` : "")}>{description}</p>
      </div>
  )
}

export default SectionHeader