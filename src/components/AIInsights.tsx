import { Sparkles, BrainCircuit, TrendingUp, AlertCircle } from 'lucide-react'

interface AIInsightsProps {
  averageRating: number
}

const getInsightDetails = (averageRating: number) => {
  if (averageRating >= 4.5) {
    return {
      title: 'Excelente Trayectoria',
      message: 'Este profesor es altamente recomendado por la comunidad. Los estudiantes destacan su metodología clara y su disposición para resolver dudas.',
      icon: <Sparkles className="h-6 w-6 text-yellow-400" />,
      color: 'border-yellow-500/20 bg-yellow-500/5',
      accent: 'text-yellow-400'
    }
  }
  
  if (averageRating >= 4) {
    return {
      title: 'Desempeño Sólido',
      message: 'Profesor muy bien valorado. Su enseñanza es estructurada y el nivel de dificultad es balanceado.',
      icon: <TrendingUp className="h-6 w-6 text-emerald-400" />,
      color: 'border-emerald-500/20 bg-emerald-500/5',
      accent: 'text-emerald-400'
    }
  }

  if (averageRating >= 3) {
    return {
      title: 'Opiniones Mixtas',
      message: 'Los comentarios sugieren un nivel de exigencia alto. Se recomienda revisar los detalles sobre la carga de trabajo y exámenes.',
      icon: <BrainCircuit className="h-6 w-6 text-primary" />,
      color: 'border-primary/20 bg-primary/5',
      accent: 'text-primary'
    }
  }

  return {
    title: 'Precaución Recomendada',
    message: 'La valoración actual es baja. Muchos estudiantes reportan dificultades con la evaluación o la comunicación.',
    icon: <AlertCircle className="h-6 w-6 text-red-400" />,
    color: 'border-red-500/20 bg-red-500/5',
    accent: 'text-red-400'
  }
}

function AIInsights({ averageRating }: AIInsightsProps) {
  const insight = getInsightDetails(averageRating)
  
  return (
    <section className={`relative overflow-hidden rounded-[2rem] border p-6 md:p-8 transition-all ${insight.color} border-white/5 shadow-xl`}>
      <div className="absolute top-0 right-0 -mr-8 -mt-8 h-48 w-48 opacity-[0.03] rotate-12">
        <BrainCircuit className="h-full w-full text-white" />
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-inner`}>
          {insight.icon}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h2 className={`text-xl font-bold font-display ${insight.accent}`}>
              {insight.title}
            </h2>
            <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-secondary/70 border border-white/5">
              AI Analysis
            </span>
          </div>
          <p className="text-secondary leading-relaxed font-medium">
            {insight.message}
          </p>
        </div>
      </div>
      
      {/* Decorative pulse point */}
      <div className="absolute bottom-6 right-8 flex items-center gap-2">
        <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-tighter text-secondary/30">Resumen actualizado</span>
      </div>
    </section>
  )
}

export default AIInsights
