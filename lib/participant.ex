defmodule TheTragedyOfTheCommons.Participant do
  def finish_description(data, id) do
    update_in(data, [:participants, id, :is_finish_description], fn _ -> true end)
  end

  def get_filter(data, id) do
    %{
      _default: true,
      participants: %{
        id => true
      },
      participants_number: "participantsNumber",
      _spread: [[:participants, id]]
    }
  end

  def filter_data(data, id) do
    Transmap.transform(data, get_filter(data, id), diff: false)
    |> Map.delete(:participants)
  end

  def filter_diff(data, diff, id) do
    Transmap.transform(diff, get_filter(data, id), diff: true)
    |> Map.delete(:participants)
  end
end

