from otree.api import Currency as c, currency_range
from ._builtin import Page, WaitPage
from .models import Constants
from .models import Player


class MainPage(Page):
    def vars_for_template(self):
        return {
            'round_num': self.round_number,
            'endowment': Constants.endowment,
            'initial_bonds' : Constants.initial_bonds,
            'g': self.player.g,
            'm': self.player.m,
            'y': self.player.y,
            'q': self.player.q,
            'finish': self.player.finish,

        }
    def get_round_number(self):
        return self.round_number

class ResultsWaitPage(WaitPage):
    pass


class Results(Page):
    pass


page_sequence = [MainPage] #, ResultsWaitPage, Results]
