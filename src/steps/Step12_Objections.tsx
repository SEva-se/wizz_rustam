

export function Step12_Objections() {
  const objections = [
    {
      obj: 'Дорого',
      meaning: 'Не видит ценности / не уверен в результате'
    },
    {
      obj: 'Я подумаю',
      meaning: 'Недостаточно ясности или есть сомнения'
    },
    {
      obj: 'Надо посоветоваться',
      meaning: 'Не принимает решение самостоятельно / есть нерешенные вопросы'
    },
    {
      obj: 'Сейчас не время',
      meaning: 'Не видит срочности проекта или испытывает страх изменений'
    },
    {
      obj: 'Попробую сам',
      meaning: 'Не видит ценности комплексного сопровождения'
    },
    {
      obj: 'Уже работал с наставниками',
      meaning: 'Разочарован прошлым опытом или не уверен в отличиях'
    },
    {
      obj: 'Нет аудитории',
      meaning: 'Считает отсутствие базы блокирующим фактором для старта'
    },
    {
      obj: 'Боюсь не окупить',
      meaning: 'Страх неудачи или потери финансовых вложений'
    }
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">11. Работа с возражениями</h2>
        <p className="text-muted text-[14px]">Анализ возможных сомнений и их истинных причин.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {objections.map((o, idx) => (
          <div key={idx} className="bg-surface border border-white/6 rounded-xl p-5 flex flex-col gap-2 transition-all hover:border-white/12">
            <h3 className="font-semibold text-white text-[15px]">{o.obj}</h3>
            <p className="text-muted text-[13px] leading-relaxed">{o.meaning}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

