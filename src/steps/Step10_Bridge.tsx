

export function Step10_Bridge() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">9. Мост к офферу</h2>
        <p className="text-muted text-[14px]">Сценарии перехода к презентации продукта.</p>
      </div>

      <div className="space-y-4">
        <div className="bg-white/50 backdrop-blur-md border border-white/80 shadow-sm rounded-xl p-5">
          <h3 className="font-bold text-dark text-[15px]">Вариант 1 — Мягкий экспертный переход</h3>
          <p className="text-dark/70 text-[13.5px] mt-1.5 leading-relaxed">Переход через пользу: связать выявленные точки роста с форматом вашего продукта и предложить рассказать подробнее.</p>
        </div>

        <div className="bg-white/50 backdrop-blur-md border border-white/80 shadow-sm rounded-xl p-5">
          <h3 className="font-bold text-dark text-[15px]">Вариант 2 — Переход через разрыв</h3>
          <p className="text-dark/70 text-[13.5px] mt-1.5 leading-relaxed">Переход через цифры: показать финансовый разрыв и предложить решение для его закрытия.</p>
        </div>

        <div className="bg-white/50 backdrop-blur-md border border-white/80 shadow-sm rounded-xl p-5">
          <h3 className="font-bold text-dark text-[15px]">Вариант 3 — Переход через самостоятельный путь</h3>
          <p className="text-dark/70 text-[13.5px] mt-1.5 leading-relaxed">Переход через время: сопоставить самостоятельные попытки (и ошибки) с быстрым и управляемым путем.</p>
        </div>

        <div className="bg-white/50 backdrop-blur-md border border-white/80 shadow-sm rounded-xl p-5">
          <h3 className="font-bold text-dark text-[15px]">Вариант 4 — Переход через риски бездействия</h3>
          <p className="text-dark/70 text-[13.5px] mt-1.5 leading-relaxed">Переход через неизменность: напомнить о застое в результатах и предложить начать двигаться системно.</p>
        </div>
      </div>
    </div>
  );
}
